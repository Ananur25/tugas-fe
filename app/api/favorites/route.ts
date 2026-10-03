import { NextRequest, NextResponse } from 'next/server';
import { supabase, User } from '@/lib/db';

// GET /api/favorites - Get all favorites for a user
export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
    }

    // Get favorites
    const { data: favs, error: favError } = await supabase
      .from('user_favorites')
      .select('user_id, favorited_by, created_at')
      .eq('favorited_by', userId);

    if (favError) throw favError;

    if (!favs || favs.length === 0) {
      return NextResponse.json({ data: [], count: 0 });
    }

    // Get user details
    const userIds = favs.map(f => f.user_id);
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .in('id', userIds)
      .eq('is_active', true);

    if (usersError) throw usersError;

    return NextResponse.json({
      data: users || [],
      count: users?.length || 0,
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

// POST /api/favorites - Add user to favorites
export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const { userId, favoritedBy } = body;

    if (!userId || !favoritedBy) {
      return NextResponse.json({ error: 'userId and favoritedBy are required' }, { status: 400 });
    }

    // Check if user exists and is active
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .eq('is_active', true)
      .single();

    if (userError) {
      return NextResponse.json({ error: 'User not found or inactive' }, { status: 404 });
    }

    // Insert favorite
    const { data, error } = await supabase
      .from('user_favorites')
      .insert([{ user_id: userId, favorited_by: favoritedBy }])
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ data: null, message: 'Already in favorites' }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({
      data: data,
      message: 'User added to favorites',
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

// DELETE /api/favorites - Remove user from favorites
export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const favoritedBy = searchParams.get('favoritedBy');

    if (!userId || !favoritedBy) {
      return NextResponse.json({ error: 'userId and favoritedBy parameters are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('favorited_by', favoritedBy);

    if (error) throw error;

    return NextResponse.json({ message: 'User removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}
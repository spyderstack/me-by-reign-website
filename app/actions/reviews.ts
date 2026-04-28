'use server'

import { supabase, supabaseAdmin } from '@/lib/supabase'
import { sendReviewNotification } from '@/lib/email'
import { revalidatePath } from 'next/cache'

export async function submitReview(productId: string, productName: string, formData: FormData) {
  const authorName = formData.get('authorName') as string;
  const rating = parseInt(formData.get('rating') as string, 10);
  const content = formData.get('content') as string;

  if (!authorName || !rating || !content) {
    return { error: 'All fields are required.' };
  }

  // Insert review into Supabase as 'pending'
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        product_id: productId,
        author_name: authorName,
        rating,
        content,
        status: 'pending',
      },
    ])
    .select()

  if (error) {
    console.error('Error inserting review:', error);
    return { error: 'Failed to submit review.' };
  }

  // Send email notification to owner
  await sendReviewNotification({
    productName,
    authorName,
    rating,
    content,
  });

  return { success: true };
}

export async function getApprovedReviews(productId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }

  return data;
}

export async function getPendingReviews(password: string) {
  // Simple password check
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Unauthorized' };
  }

  const { data, error } = await supabaseAdmin
    .from('reviews')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending reviews:', error);
    return { error: 'Failed to fetch reviews' };
  }

  return { reviews: data };
}

export async function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected', password: string) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabaseAdmin
    .from('reviews')
    .update({ status })
    .eq('id', reviewId);

  if (error) {
    console.error(`Error updating review ${reviewId} to ${status}:`, error);
    return { error: 'Failed to update review status.' };
  }

  revalidatePath('/admin/reviews');
  revalidatePath('/products/[handle]', 'page');

  return { success: true };
}

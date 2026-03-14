import { logEvent } from '../api/eventApi';

export const trackView = async (user_id: number, product_id: number, user_session: string) => {
  await logEvent({
    user_id,
    product_id,
    event_type: 'view',
    user_session,
    event_time: new Date().toISOString(),
  });
};

export const trackCart = async (user_id: number, product_id: number, user_session: string) => {
  await logEvent({
    user_id,
    product_id,
    event_type: 'cart',
    user_session,
    event_time: new Date().toISOString(),
  });
};

export const trackRemoveFromCart = async (user_id: number, product_id: number, user_session: string) => {
  await logEvent({
    user_id,
    product_id,
    event_type: 'remove_from_cart',
    user_session,
    event_time: new Date().toISOString(),
  });
};

export const trackPurchase = async (user_id: number, product_id: number, user_session: string) => {
  await logEvent({
    user_id,
    product_id,
    event_type: 'purchase',
    user_session,
    event_time: new Date().toISOString(),
  });
};

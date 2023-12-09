import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
    OneSignal.User.removeTag('user_email');
}

export function tagCartUpdate(itemsCount: string) {
    OneSignal.User.addTag('cart_items_count', itemsCount);
}
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Đọc Cookie có tên là 'NEXT_LOCALE', nếu không có thì mặc định là 'vi'
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
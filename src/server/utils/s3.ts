export const bucketName = "t3-bucket";

export const avatarFileExt = "webp";

export function getAvatarPath(userId: string) {
  return `avatars/${userId}.${avatarFileExt}`;
}
export function removeVersionQueryParam(path: string): string {
  return path?.split("?")?.[0] || "";
}
export function replaceVersionQueryParam(path: string): string {
  if (!path) return "";
  return removeVersionQueryParam(path) + `?v=${Date.now()}`;
}

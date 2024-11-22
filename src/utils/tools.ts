function debounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

function createInitials(name: string): string {
  if (!name) return '';
  const nameParts = name.split(' ').filter(Boolean);
  const initials = nameParts
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('');
  return initials;
}

export {
  debounce,
  createInitials
}
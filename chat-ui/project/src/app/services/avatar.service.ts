import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  getInitialsAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    // Generate a consistent color based on the name
    const hue = this.getHashCode(name) % 360;
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="hsl(${hue}, 70%, 50%)" />
        <text x="50" y="50" text-anchor="middle" dy="0.35em" 
              fill="white" font-family="Arial" font-size="40" font-weight="bold">
          ${initials}
        </text>
      </svg>
    `)}`;
  }

  private getHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }
}
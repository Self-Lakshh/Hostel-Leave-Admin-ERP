import { useState, useEffect } from 'react';

// Create a custom event for sidebar state changes
const SIDEBAR_EVENT = 'sidebarStateChange';

export const useSidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    // Initialize from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    // Save to localStorage whenever state changes
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent(SIDEBAR_EVENT, { detail: collapsed }));
  }, [collapsed]);

  useEffect(() => {
    // Listen for sidebar state changes from other components
    const handleSidebarChange = (e: CustomEvent) => {
      setCollapsed(e.detail);
    };

    window.addEventListener(SIDEBAR_EVENT, handleSidebarChange as EventListener);

    return () => {
      window.removeEventListener(SIDEBAR_EVENT, handleSidebarChange as EventListener);
    };
  }, []);

  const toggleSidebar = () => setCollapsed((prev: boolean) => !prev);

  return { collapsed, toggleSidebar };
};

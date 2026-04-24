'use client';

import { createContext, useContext, useState } from 'react';

type CategoryBarContextValue = {
  title: string;
  setTitle: (title: string) => void;
  pinned: boolean;
  setPinned: (pinned: boolean) => void;
};

const CategoryBarContext = createContext<CategoryBarContextValue>({
  title: '',
  setTitle: () => {},
  pinned: false,
  setPinned: () => {},
});

export function CategoryBarProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('');
  const [pinned, setPinned] = useState(false);
  return (
    <CategoryBarContext.Provider value={{ title, setTitle, pinned, setPinned }}>
      {children}
    </CategoryBarContext.Provider>
  );
}

export function useCategoryBar() {
  return useContext(CategoryBarContext);
}

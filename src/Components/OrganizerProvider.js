import { createContext, useContext, useState, useEffect } from 'react';

const OrganizerContext = createContext();

export const OrganizerProvider = ({ children }) => {
  // Check localStorage for existing organizer data on page load
  const storedOrganizer = JSON.parse(localStorage.getItem('organizer'));
  const [organizer, setOrganizer] = useState(storedOrganizer || null);

  useEffect(() => {
    // Save organizer data to localStorage whenever it changes
    localStorage.setItem('organizer', JSON.stringify(organizer));
  }, [organizer]);

  const login = (organizerData) => {
    setOrganizer(organizerData);
  };

  const logout = () => {
    setOrganizer(null);
  };

  return (
    <OrganizerContext.Provider value={{ organizer, login, logout }}>
      {children}
    </OrganizerContext.Provider>
  );
};

export const useOrganizer = () => {
  return useContext(OrganizerContext);
};
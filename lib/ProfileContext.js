'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'admission_route_state_v1';

const defaultState = {
  profile: null,
  compareIds: [],
  roadmapProgress: {},
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch (e) {
      // ignore — private mode / blocked storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state, loaded]);

  function setProfile(profile) {
    setState((s) => ({ ...s, profile }));
  }

  function toggleCompare(id) {
    setState((s) => {
      const has = s.compareIds.includes(id);
      const next = has ? s.compareIds.filter((x) => x !== id) : [...s.compareIds, id].slice(-2);
      return { ...s, compareIds: next };
    });
  }

  function setRoadmapStep(id, done) {
    setState((s) => ({ ...s, roadmapProgress: { ...s.roadmapProgress, [id]: done } }));
  }

  function reset() {
    setState(defaultState);
  }

  return (
    <ProfileContext.Provider
      value={{ ...state, loaded, setProfile, toggleCompare, setRoadmapStep, reset }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { universities } from './data/universities';
import { recommend } from './recommend';

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

  // Отмеченные для сравнения вузы могут выпасть из подбора после правки анкеты —
  // тогда экран сравнения показал бы вариант, которого больше нет в рекомендациях.
  function setProfile(profile) {
    setState((s) => {
      const stillRecommended = recommend(profile, universities, 3).map((u) => u.id);
      return { ...s, profile, compareIds: s.compareIds.filter((id) => stillRecommended.includes(id)) };
    });
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

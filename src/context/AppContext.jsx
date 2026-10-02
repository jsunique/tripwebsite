import { createContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "travel-app-state";

const initialState = {
  currentUserId: null,
  users: {},
};

function createTrip() {
  return {
    companions: [],
    budget: 0,
    expenses: [],
    activities: [],
  };
}

function appReducer(state, action) {
  if (action.type === "TOGGLE_LIKE") {
    const userId = state.currentUserId;
    const currentUser = state.users[userId];
    if (!currentUser) return state;

    const countryName = action.payload;
    const likes = currentUser.likes ?? [];
    const updatedLikes = likes.includes(countryName)
      ? likes.filter((name) => name !== countryName)
      : [...likes, countryName];

    return {
      ...state,
      users: {
        ...state.users,
        [userId]: { ...currentUser, likes: updatedLikes },
      },
    };
  }

  if (action.type === "TOGGLE_TRIP_COUNTRY") {
    const userId = state.currentUserId;
    const currentUser = state.users[userId];
    if (!currentUser) return state;

    const countryName = action.payload;
    const updatedTrips = { ...(currentUser.trips ?? {}) };

    if (Object.hasOwn(updatedTrips, countryName)) {
      delete updatedTrips[countryName];
    } else {
      updatedTrips[countryName] = createTrip();
    }

    return {
      ...state,
      users: {
        ...state.users,
        [userId]: { ...currentUser, trips: updatedTrips },
      },
    };
  }
  if (action.type === "ADD_COMPANION") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, companionName } = action.payload;

  const trip = currentUser?.trips?.[countryName];
  const name = companionName.trim();

  if (!trip || !name) return state;

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            companions: [...trip.companions, name],
          },
        },
      },
    },
  };
}
if (action.type === "ADD_ACTIVITY") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, activityName } = action.payload;
  const trip = currentUser?.trips?.[countryName];
  const name = activityName.trim();

  if (!trip || !name) return state;

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            activities: [...trip.activities, name],
          },
        },
      },
    },
  };
}
if (action.type === "REMOVE_ACTIVITY") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, index } = action.payload;
  const trip = currentUser?.trips?.[countryName];

  if (!trip || index < 0 || index >= trip.activities.length) {
    return state;
  }

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            activities: trip.activities.filter((_, i) => i !== index),
          },
        },
      },
    },
  };
}
if (action.type === "REMOVE_COMPANION") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, index } = action.payload;
  const trip = currentUser?.trips?.[countryName];

  if (!trip || index < 0 || index >= trip.companions.length) {
    return state;
  }

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            companions: trip.companions.filter((_, i) => i !== index),
          },
        },
      },
    },
  };
}
if (action.type === "ADD_EXPENSE") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, title, amount } = action.payload;
  const trip = currentUser?.trips?.[countryName];

  if (!trip) return state;

  const expense = {
    id: crypto.randomUUID(),
    title,
    amount,
  };

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            expenses: [...trip.expenses, expense],
          },
        },
      },
    },
  };
}

if (action.type === "REMOVE_EXPENSE") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, expenseId } = action.payload;
  const trip = currentUser?.trips?.[countryName];

  if (!trip) return state;

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            expenses: trip.expenses.filter(
              (expense) => expense.id !== expenseId
            ),
          },
        },
      },
    },
  };
}

  if (action.type === "LOGIN") {
    const userId = action.payload.trim().toLowerCase();
    if (!userId) return state;

    const user = state.users[userId] ?? { likes: [], trips: {} };
    return {
      ...state,
      currentUserId: userId,
      users: { ...state.users, [userId]: user },
    };
  }
  if (action.type === "SET_TRIP_BUDGET") {
  const userId = state.currentUserId;
  const currentUser = state.users[userId];
  const { countryName, budget } = action.payload;
  const trip = currentUser?.trips?.[countryName];

  if (!trip || !Number.isFinite(budget) || budget < 0) return state;

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...currentUser,
        trips: {
          ...currentUser.trips,
          [countryName]: {
            ...trip,
            budget,
          },
        },
      },
    },
  };
}

  if (action.type === "LOGOUT") {
    return { ...state, currentUserId: null };
  }

  return state;
}

function getInitialState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return initialState;

    const parsedState = JSON.parse(savedState);
    const savedUsers = parsedState.users ?? {};

    const users = Object.fromEntries(
      Object.entries(savedUsers).map(([userId, user]) => {
        // Keep previously selected countries, but discard the old shared trip data.
        const { trip: oldTrip, ...userWithoutOldTrip } = user;
        const oldCountries = oldTrip?.countries ?? [];
        const migratedTrips = Object.fromEntries(
          oldCountries.map((countryName) => [countryName, createTrip()])
        );

        return [
          userId,
          {
            ...userWithoutOldTrip,
            likes: Array.isArray(user.likes) ? user.likes : [],
            trips: { ...migratedTrips, ...(user.trips ?? {}) },
          },
        ];
      })
    );

    return {
      currentUserId: parsedState.currentUserId ?? null,
      users,
    };
  } catch {
    return initialState;
  }
}

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

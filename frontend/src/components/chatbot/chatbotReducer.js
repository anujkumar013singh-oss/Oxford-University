import { CHAT_STATES } from './chatbotStates';

export const initialState = {
  isOpen: false,
  currentStep: 'GREETING',
  messages: [],
  collectedData: {},
  isTyping: false,
  isComplete: false,
  error: null,
};

export function chatbotReducer(state, action) {
  switch (action.type) {
    case 'OPEN_AND_START': {
      const greetingState = CHAT_STATES.GREETING;
      return {
        ...state,
        isOpen: true,
        messages: [
          {
            id: Date.now(),
            type: 'bot',
            text: greetingState.botMessage,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case 'USER_MESSAGE': {
      const { field, value } = action.payload;
      const collectedData = { ...state.collectedData };
      if (value && value.trim()) {
        collectedData[field] = value.trim();
      }
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: Date.now(),
            type: 'user',
            text: value.trim() || '(skipped)',
            timestamp: new Date().toISOString(),
          },
        ],
        collectedData,
        error: null,
      };
    }

    case 'SET_TYPING': {
      return { ...state, isTyping: action.payload };
    }

    case 'ADVANCE_STATE': {
      const currentStateData = CHAT_STATES[state.currentStep];
      const nextStateId =
        typeof currentStateData.nextState === 'function'
          ? currentStateData.nextState(action.payload || '')
          : currentStateData.nextState;

      if (!nextStateId) {
        return { ...state, isComplete: true };
      }

      const nextState = CHAT_STATES[nextStateId];
      const collected = state.collectedData;
      const botMsg =
        typeof nextState.botMessage === 'function'
          ? nextState.botMessage(collected.name || 'there')
          : nextState.botMessage;

      const isComplete = !nextState.nextState;

      return {
        ...state,
        currentStep: nextState.id,
        isComplete,
        messages: [
          ...state.messages,
          {
            id: Date.now(),
            type: 'bot',
            text: botMsg,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case 'SHOW_ERROR': {
      return { ...state, error: action.payload };
    }

    case 'TOGGLE_CHAT': {
      return { ...state, isOpen: !state.isOpen };
    }

    case 'MINIMIZE': {
      return { ...state, isOpen: false };
    }

    default:
      return state;
  }
}

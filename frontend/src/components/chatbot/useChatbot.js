import { useReducer, useEffect, useRef } from 'react';
import { CHAT_STATES } from './chatbotStates';
import { chatbotReducer, initialState } from './chatbotReducer';
import { submitLeadSilently } from '../../utils/leadSubmit';

export function useChatbot() {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);
  const autoOpenTimerRef = useRef(null);

  useEffect(() => {
    autoOpenTimerRef.current = setTimeout(() => {
      dispatch({ type: 'OPEN_AND_START' });
    }, 3000);

    return () => clearTimeout(autoOpenTimerRef.current);
  }, []);

  useEffect(() => {
    if (state.isComplete && Object.keys(state.collectedData).length >= 4) {
      submitLeadSilently(state.collectedData);
    }
  }, [state.isComplete, state.collectedData]);

  const handleUserInput = (value) => {
    const currentState = CHAT_STATES[state.currentStep];
    if (!currentState.validate) return;

    if (!currentState.validate(value)) {
      dispatch({ type: 'SHOW_ERROR', payload: currentState.errorMsg });
      return;
    }

    dispatch({ type: 'USER_MESSAGE', payload: { field: currentState.field, value } });
    dispatch({ type: 'SET_TYPING', payload: true });

    setTimeout(() => {
      dispatch({ type: 'SET_TYPING', payload: false });
      dispatch({ type: 'ADVANCE_STATE', payload: value });
    }, 1200);
  };

  return { state, dispatch, handleUserInput };
}

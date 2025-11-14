import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../rtk/store/store';

// Custom hook for dispatching actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

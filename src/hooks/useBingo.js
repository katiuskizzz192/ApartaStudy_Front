import {useContext} from 'react';
import {BingoContext} from '../context/BingoContext';

export const useBingo = () => useContext(BingoContext);

import { io } from 'socket.io-client';
import { IQuote } from '@/types/dataTypes';

const socketUrl: string = import.meta.env.VITE_SOCKET_URL;
export const socket = io(socketUrl, {
  transports: ['websocket'],
});

export const startTickerWatcher = () => {
  socket.emit('start');
};

export const addTickerListener = (listener: (data: IQuote[]) => void) => {
  socket.on('ticker', listener);
};

export const removeTickerListener = (listener?: (data: IQuote[]) => void) => {
  socket.off('ticker', listener);
};

export const changeIntervalWatcher = (newValue: number = 1000) => {
  socket.emit('change_interval', newValue);
};

export const filterTickersWatcher = (allowedList: string[]) => {
  socket.emit('filter', allowedList);
};

export const getAllTickersList = (): Promise<string[]> => {
  return new Promise<string[]>((resolve) => {
    socket.emit('get-all-tickers');
    socket.once('get-all-tickers', (data: string[]) => {
      resolve(data);
    });
  });
};

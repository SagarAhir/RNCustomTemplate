import { Colors } from './Colors';
import { font } from './Responsive';

export const CommonStyles = {};

export const CommonStylesFn = {
  text: (size: number, color = Colors.black, fontFamily = '') => {
    return {
      fontSize: (size && font(size)) || font(3.5),
      color,
      fontFamily,
    };
  },
};

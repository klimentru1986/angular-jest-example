import { ObjToArrPipe } from './obj-to-arr.pipe';

describe('ObjToArrPipe', () => {
  let pipe: ObjToArrPipe;

  beforeEach(() => {
    pipe = new ObjToArrPipe();
  });

  it('transforms X to Y', () => {
    const value: Object = { Xprop: 'Xval', Yprop: 'Yval' };

    expect(pipe.transform(value)).toEqual(['Xval', 'Yval']);
  });
});

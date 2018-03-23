import { ObjToArrPipe } from './obj-to-arr.pipe';

describe('ObjToArrPipe', () => {
  let pipe: ObjToArrPipe;

  beforeEach(() => {
    pipe = new ObjToArrPipe();
  });

  it('transforms X to Y', () => {
    // Arrange
    const inputValue: Object = { Xprop: 'Xval', Yprop: 'Yval' };
    const expectedValue: string[] = ['Xval', 'Yval'];

    // Act
    const result = pipe.transform(inputValue);

    // Assert
    expect(result).toEqual(expectedValue);
  });
});



import React from 'react';
import {render} from '@testing-library/react';
import {Button} from './button';

describe('Button component', () => {
  test('корректно отображает кнопку с текстом', () => {
    const {container} = render(<Button text="Click me!"/>);
    expect(container).toMatchSnapshot();
  });

  test('корректно отображает кнопку без текста', () => {
    const {container} = render(<Button/>);
    expect(container).toMatchSnapshot();
  });

  test('корректно отображает отключенную кнопку', () => {
    const {container} = render(<Button disabled/>);
    expect(container).toMatchSnapshot();
  });

  test('корректно отображает кнопку с индикацией загрузки', () => {
    const {container} = render(<Button isLoader/>);
    expect(container).toMatchSnapshot();
  });

  test('корректность вызова колбека при клике на кнопку', () => {
    const handleClick = jest.fn();
    const {getByText} = render(<Button text="Click me!" onClick={handleClick}/>);
    getByText('Click me!').click();
    expect(handleClick).toHaveBeenCalled();
  });
});

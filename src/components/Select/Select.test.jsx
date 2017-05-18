import React from 'react';
import { shallow, mount } from 'enzyme';
import Value from './Value';
import Option from './Option';
import OptionGroup from './OptionGroup';
import Select from './Select';

describe('Select', () => {
  it('should display option list', () => {
    const options = [
      { value: 1, label: 'Test' },
      { value: 2, label: 'Test2' },
      { value: 3, label: 'Test3' },
    ];
    const wrapper = mount(<Select isExpanded options={options} />);
    const optionGroupWrapper = wrapper.find(OptionGroup);

    expect(optionGroupWrapper).toHaveLength(1);
    expect(optionGroupWrapper.find(Option)).toHaveLength(3);
  });

  it('should filter options based on input value', () => {
    const options = [
      { value: 1, label: 'Value' },
      { value: 2, label: 'Value 2' },
      { value: 3, label: 'Val 3' },
      { value: 4, label: 'Test' },
      { value: 5, label: 'Test2' },
      { value: 6, label: 'Test3' },
    ];
    const wrapper = mount(<Select isExpanded inputValue={'val'} options={options} />);
    const optionGroupWrapper = wrapper.find(OptionGroup);

    expect(optionGroupWrapper).toHaveLength(1);
    expect(optionGroupWrapper.find(Option)).toHaveLength(3);
  });

  it('should pass input value on change', () => {
    const onInputChange = jest.fn();
    const wrapper = mount(<Select onInputChange={onInputChange} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    inputWrapper.simulate('change', {
      target: {
        value: 'testString',
      },
    });
    expect(onInputChange).toBeCalledWith('testString');
  });

  it('should be able to render option groups', () => {
    const optionGroups = [
      {
        label: 'Test',
        options: [
          { value: 1, label: 'Value' },
        ],
      },
      {
        label: 'Test2',
        options: [
          { value: 2, label: 'Value2' },
        ],
      },
    ];
    const wrapper = shallow(<Select isExpanded optionGroups={optionGroups} />);

    expect(wrapper.find(OptionGroup)).toHaveLength(2);
  });

  it('should not display empty option groups', () => {
    const optionGroups = [
      {
        label: 'Test',
        options: [
          { value: 1, label: 'Value' },
        ],
      },
      {
        label: 'Test2',
        options: [],
      },
    ];
    const wrapper = shallow(<Select isExpanded optionGroups={optionGroups} />);

    expect(wrapper.find(OptionGroup)).toHaveLength(1);
  });

  it('should be able to extract selected values on option click', () => {
    const options = [
      { value: 1, label: 'Test' },
      { value: 2, label: 'Test2' },
      { value: 3, label: 'Test3' },
    ];
    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select isExpanded options={options} onChange={onChangeHandler} />);

    wrapper.find(Option).at(0).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith([options[0]]);

    wrapper.find(Option).at(0).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith([options[0], options[1]]);

    wrapper.find(Option).at(0).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith([options[0], options[1], options[2]]);
  });

  it('should not add values that are already added', () => {
    const options = [
      { value: 1, label: 'Test' },
      { value: 2, label: 'Test2' },
      { value: 3, label: 'Test3' },
    ];
    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select isExpanded options={options} onChange={onChangeHandler} />);

    wrapper.find(Option).at(0).simulate('mousedown');
    wrapper.find(Option).at(0).simulate('mousedown');
    wrapper.find(Option).at(0).simulate('mousedown');

    expect(onChangeHandler).toBeCalledWith([options[0]]);
  });

  it('should be able to extract selected values on option click by groups', () => {
    const optionGroups = [
      {
        id: 'genre',
        label: 'Test',
        options: [
          { value: 1, label: 'Value', type: 'genre' },
        ],
      },
      {
        id: 'test',
        label: 'Test2',
        options: [
          { value: 2, label: 'Value2', type: 'test' },
        ],
      },
    ];

    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select isExpanded optionGroups={optionGroups} groupBy={'type'} onChange={onChangeHandler} />);

    wrapper.find(OptionGroup).at(0).find(Option).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith({
      genre: optionGroups[0].options,
    });

    wrapper.find(OptionGroup).at(0).find(Option).simulate('mousedown');
    expect(onChangeHandler).toBeCalledWith({
      genre: optionGroups[0].options,
      test: optionGroups[1].options,
    });
  });

  it('should ignore to group values that doesn\'t have property to group by', () => {
    const optionGroups = [
      {
        id: 'genre',
        label: 'Test',
        options: [
          { value: 1, label: 'Value', type: 'genre' },
        ],
      },
      {
        id: 'test',
        label: 'Test2',
        options: [
          { value: 2, label: 'Value2' },
        ],
      },
    ];

    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select isExpanded optionGroups={optionGroups} groupBy={'type'} onChange={onChangeHandler} />);

    wrapper.find(OptionGroup).at(0).find(Option).simulate('mousedown');
    wrapper.find(OptionGroup).at(0).find(Option).simulate('mousedown');

    expect(onChangeHandler).toBeCalledWith({
      genre: optionGroups[0].options,
    });
  });

  it('should be able to map grouped options as values', () => {
    const optionGroups = [
      {
        id: 'genre',
        label: 'Test',
        options: [
          { value: 1, label: 'Value', type: 'genre' },
          { value: 2, label: 'Value2', type: 'genre' },
        ],
      },
      {
        id: 'test',
        label: 'Test2',
        options: [
          { value: 3, label: 'Value3', type: 'test' },
        ],
      },
    ];

    const values = {
      genre: [
        { value: 1, label: 'Value' },
        { value: 2, label: 'Value2' },
      ],
      test: [
        { value: 3, label: 'Value3' },
      ],
    };

    const onChangeHandler = jest.fn();
    const wrapper = mount(<Select values={values} optionGroups={optionGroups} groupBy={'type'} onChange={onChangeHandler} />);

    expect(wrapper.instance().state.values).toEqual([
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
      { value: 3, label: 'Value3', type: 'test' },
    ]);
  });

  it('should throw error if value is specified by object without groupBy prop', () => {
    const optionGroups = [
      {
        id: 'genre',
        label: 'Test',
        options: [
          { value: 1, label: 'Value', type: 'genre' },
          { value: 2, label: 'Value2', type: 'genre' },
        ],
      },
      {
        id: 'test',
        label: 'Test2',
        options: [
          { value: 3, label: 'Value3', type: 'test' },
        ],
      },
    ];

    const values = {
      genre: [
        { value: 1, label: 'Value' },
        { value: 2, label: 'Value2' },
      ],
      test: [
        { value: 3, label: 'Value3' },
      ],
    };

    expect(() => mount(<Select values={values} optionGroups={optionGroups} />)).toThrow();
  });

  it('should be able to select options', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
      { value: 3, label: 'Value3', type: 'test' },
    ];
    const wrapper = mount(<Select isExpanded options={options} />);
    const optionWrapper = wrapper.find(Option);

    optionWrapper.at(0).simulate('mousedown');
    optionWrapper.at(1).simulate('mousedown');
    optionWrapper.at(2).simulate('mousedown');

    expect(wrapper.find(Value)).toHaveLength(3);
  });

  it('should be able to delete selected values', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
      { value: 3, label: 'Value3', type: 'test' },
    ];
    const wrapper = mount(<Select values={options} options={options} />);
    const valueWrapper = wrapper.find(Value);

    expect(valueWrapper).toHaveLength(3);

    valueWrapper.at(0).find('[data-test="Value.deleteButton"]').simulate('mousedown');
    valueWrapper.at(1).find('[data-test="Value.deleteButton"]').simulate('mousedown');
    valueWrapper.at(2).find('[data-test="Value.deleteButton"]').simulate('mousedown');

    expect(wrapper.find(Value)).toHaveLength(0);
  });

  it('should be able to delete selected values on input backspace if input is empty', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
      { value: 3, label: 'Value3', type: 'test' },
    ];
    const wrapper = mount(<Select inputValue={''} values={options} options={options} />);
    const valueWrapper = wrapper.find(Value);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: 8,
    };

    expect(valueWrapper).toHaveLength(3);

    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(0);
  });

  it('should be able to select values on enter key', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
      { value: 3, label: 'Value3', type: 'test' },
    ];
    const wrapper = mount(<Select options={options} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: 13,
    };

    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(3);
  });

  it('should be able to select values on enter key with option groups', () => {
    const optionGroups = [
      {
        id: 'genre',
        label: 'Test',
        options: [
          { value: 1, label: 'Value', type: 'genre' },
          { value: 2, label: 'Value2', type: 'genre' },
        ],
      },
      {
        id: 'test',
        label: 'Test2',
        options: [
          { value: 3, label: 'Value3', type: 'test' },
        ],
      },
    ];
    const wrapper = mount(<Select optionGroups={optionGroups} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: 13,
    };

    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);
    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(3);
  });

  it('should clear input on option select', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
    ];
    const wrapper = mount(<Select inputValue={'Value'} isExpanded options={options} />);
    wrapper.find(Option).at(0).simulate('mousedown');

    expect(wrapper.find('[data-test="Select.input"]').props().value).toBe('');
  });

  it('should not be able to delete value with backspace if input value is not empty', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
    ];
    const wrapper = mount(<Select inputValue={'t'} values={options} options={options} />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');
    const event = {
      keyCode: 8,
    };

    inputWrapper.simulate('keydown', event);

    expect(wrapper.find(Value)).toHaveLength(1);
  });

  it('should not show selected options', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
    ];
    const wrapper = mount(<Select isExpanded options={options} />);
    const optionWrapper = wrapper.find(Option);
    optionWrapper.at(0).simulate('mousedown');

    expect(wrapper.find(Option)).toHaveLength(1);
    expect(wrapper.find(Option).at(0).props().option.value).toBe(2);
  });

  it('should be able to expand on input focus', () => {
    const wrapper = mount(<Select />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(0);
    inputWrapper.simulate('focus');
    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
  });

  it('should be able to contract on input blur', () => {
    const wrapper = mount(<Select isExpanded />);
    const inputWrapper = wrapper.find('[data-test="Select.input"]');

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
    inputWrapper.simulate('blur');
    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(0);
  });

  it('should not hide option container and refocus on option click', () => {
    const options = [
      { value: 1, label: 'Value', type: 'genre' },
      { value: 2, label: 'Value2', type: 'genre' },
    ];
    const wrapper = mount(<Select isExpanded options={options} />);
    const optionWrapper = wrapper.find(Option);

    optionWrapper.at(0).simulate('mousedown');

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
  });

  it('should blur input on escape key', () => {
    const wrapper = mount(<Select isExpanded />);

    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(1);
    wrapper.instance().handleInputEscape();
    expect(wrapper.find('[data-test="Select.optionContainer"]')).toHaveLength(0);
  });

  it('should clear input on escape key', () => {
    const wrapper = mount(<Select inputValue={'Test'} />);

    wrapper.instance().handleInputEscape();
    expect(wrapper.find('[data-test="Select.input"]').props().value).toBe('');
  });
});
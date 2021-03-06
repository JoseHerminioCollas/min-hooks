import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WidgetAdd from '../components/WidgetAdd'

Enzyme.configure({ adapter: new Adapter() })

const mockaddWidgetName = jest.fn()
jest.mock('../components/StoreContext', () => (
  {
    StoreContext: {
      Consumer: props => (props.children({
        state: { cssSheet: { classes: { addItem: 'X' } } },
        actions: {
          addWidgetName: mockaddWidgetName,
        },
      })
      ),
    },
  }
))

describe('WidgetAdd', () => {
  it('should mount and call an action in its Context', () => {
    const el = mount(
      <WidgetAdd />,
    )

    expect(el.find('input').length).toBe(1)
    expect(el.find('button').length).toBe(1)

    act(() => {
      el.find('input').prop('onChange')({ target: { value: 'x' } })
    })
    el.update()
    expect(el.find('input').prop('value')).toBe('x')

    act(() => {
      el.find('button').prop('onClick')()
    })
    expect(mockaddWidgetName.mock.calls.length).toBe(1)
  })
})

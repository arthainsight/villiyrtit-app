import { render, fireEvent, act } from '@testing-library/react-native'
import { SearchBar } from '@/components/SearchBar'
import { useAppStore } from '@/store/useAppStore'

describe('SearchBar — store sync', () => {
  beforeEach(() => {
    useAppStore.getState().setSearchQuery('')
  })

  it('shows the current store.searchQuery on mount (so a fresh instance on /plants is not blank)', () => {
    act(() => {
      useAppStore.getState().setSearchQuery('nokk')
    })
    const { getByLabelText } = render(<SearchBar />)
    expect(getByLabelText('Hakukenttä').props.value).toBe('nokk')
  })

  it('updates store.searchQuery immediately on input (no debounce on visible value)', () => {
    const { getByLabelText } = render(<SearchBar />)
    fireEvent.changeText(getByLabelText('Hakukenttä'), 'voi')
    expect(useAppStore.getState().searchQuery).toBe('voi')
  })

  it('reflects external store changes (e.g. EmptyState clear) in the input value', () => {
    act(() => {
      useAppStore.getState().setSearchQuery('vanha')
    })
    const { getByLabelText } = render(<SearchBar />)
    expect(getByLabelText('Hakukenttä').props.value).toBe('vanha')
    act(() => {
      useAppStore.getState().setSearchQuery('')
    })
    expect(getByLabelText('Hakukenttä').props.value).toBe('')
  })
})

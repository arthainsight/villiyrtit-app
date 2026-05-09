import { render, fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { BeginnerBadge } from '@/components/BeginnerBadge'
import { DangerCallout } from '@/components/DangerCallout'
import { CollapsibleSection } from '@/components/CollapsibleSection'
import { EmptyState } from '@/components/EmptyState'

describe('DifficultyBadge', () => {
  it('renders the label for each difficulty', () => {
    expect(render(<DifficultyBadge difficulty="easy" />).getByText('Helppo')).toBeTruthy()
    expect(render(<DifficultyBadge difficulty="medium" />).getByText('Keskitaso')).toBeTruthy()
    expect(render(<DifficultyBadge difficulty="hard" />).getByText('Vaikea')).toBeTruthy()
  })

  it('exposes accessibility label', () => {
    const { getByLabelText } = render(<DifficultyBadge difficulty="easy" />)
    expect(getByLabelText(/Vaikeustaso: Helppo/)).toBeTruthy()
  })
})

describe('BeginnerBadge', () => {
  it('renders Aloittelijalle text', () => {
    expect(render(<BeginnerBadge />).getByText('Aloittelijalle')).toBeTruthy()
  })

  it('exposes accessibility label', () => {
    const { getByLabelText } = render(<BeginnerBadge />)
    expect(getByLabelText(/Aloittelijaystävällinen/)).toBeTruthy()
  })
})

describe('DangerCallout', () => {
  it('renders children with default severity (warn)', () => {
    const { getByText, getByLabelText } = render(
      <DangerCallout>Varoitusteksti</DangerCallout>
    )
    expect(getByText('Varoitusteksti')).toBeTruthy()
    expect(getByLabelText(/Huomio:/)).toBeTruthy()
  })

  it('uses danger accessibility label when severity is danger', () => {
    const { getByLabelText } = render(
      <DangerCallout severity="danger">Tappavaa</DangerCallout>
    )
    expect(getByLabelText(/Varoitus:/)).toBeTruthy()
  })
})

describe('CollapsibleSection', () => {
  it('renders title and is closed by default', () => {
    const { getByText, queryByText } = render(
      <CollapsibleSection title="Tunnistus">
        <Text>Sisältö</Text>
      </CollapsibleSection>
    )
    expect(getByText('Tunnistus')).toBeTruthy()
    expect(queryByText('Sisältö')).toBeNull()
  })

  it('shows content when defaultOpen=true', () => {
    const { getByText } = render(
      <CollapsibleSection title="Varoitukset" defaultOpen>
        <Text>Pidettävä huoli</Text>
      </CollapsibleSection>
    )
    expect(getByText('Pidettävä huoli')).toBeTruthy()
  })

  it('toggles open/closed on press', () => {
    const { getByLabelText, queryByText } = render(
      <CollapsibleSection title="Tunnistus">
        <Text>Salainen</Text>
      </CollapsibleSection>
    )
    expect(queryByText('Salainen')).toBeNull()
    fireEvent.press(getByLabelText(/Tunnistus, suljettu/))
    expect(queryByText('Salainen')).toBeTruthy()
  })
})

describe('EmptyState', () => {
  it('renders just the message when no action provided', () => {
    const { getByText, queryByLabelText } = render(<EmptyState message="Ei tuloksia" />)
    expect(getByText('Ei tuloksia')).toBeTruthy()
    expect(queryByLabelText('Tyhjennä')).toBeNull()
  })

  it('renders an action button when actionLabel + onAction are provided', () => {
    const onAction = jest.fn()
    const { getByLabelText } = render(
      <EmptyState message="Ei tuloksia" actionLabel="Tyhjennä filterit" onAction={onAction} />
    )
    fireEvent.press(getByLabelText('Tyhjennä filterit'))
    expect(onAction).toHaveBeenCalledTimes(1)
  })
})

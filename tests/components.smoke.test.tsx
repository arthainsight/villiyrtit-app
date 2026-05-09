import { render } from '@testing-library/react-native'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { BeginnerBadge } from '@/components/BeginnerBadge'
import { DangerCallout } from '@/components/DangerCallout'

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

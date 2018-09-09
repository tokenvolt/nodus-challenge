import styled, { keyframes } from 'styled-components'
import { Spinner } from 'styled-icons/fa-solid/Spinner.cjs'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const AnimatedSpinner = styled(Spinner)`
  animation: ${spin} 1.5s ease-in-out 0s infinite;
`

export default AnimatedSpinner

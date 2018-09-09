import React from 'react'
import { Flex, Box } from 'rebass'

const App = props => (
  <div>
    <Flex
      flexWrap='wrap'
      style={{ height: "25vh" }}
    >
      <Box width={[ 1, 2/3 ]} p={3} color='white' bg='blue'>
        Flex
      </Box>
      <Box width={[ 1, 1/3 ]} p={3} color='white' bg='violet'>
        Box
      </Box>
    </Flex>
    <Box
      style={{ height: "75vh", backgroundColor: '#efefef' }}
    >
    </Box>
  </div>
)

export default App

import { IconButton } from '@/application/components/buttons'

import { Container } from './styles'

import { FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <Container>
      <span>© 2022 Code Burger</span>
      <div>
        <IconButton><FiInstagram /></IconButton>
        <IconButton><FiTwitter /></IconButton>
        <IconButton><FiYoutube /></IconButton>
      </div>
    </Container>
  )
}

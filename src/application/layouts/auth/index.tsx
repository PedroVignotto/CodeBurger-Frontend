import React from 'react'

import { Container } from './styles'

type Props = { children: string | JSX.Element }

export const Auth: React.FC<Props> = ({ children }: Props) => <Container>{children}</Container>

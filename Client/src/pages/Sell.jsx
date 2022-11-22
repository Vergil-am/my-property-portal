import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



const Container = styled.div``
const Wrapper = styled.div`
    height: 100vh; width: 100vw;
`

function sell() {
    return (
        <Container>
            <Navbar />
            <Wrapper>
                <h1>Sell page</h1>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default sell

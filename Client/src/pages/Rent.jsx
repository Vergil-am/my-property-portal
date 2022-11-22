import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'




const Container = styled.div``
const Wrapper = styled.div`
    height: 100vh; width: 100vw;
`


function Rent() {
    return (
        <Container>
            <Navbar />
            <Wrapper>
                <h1>Rent page</h1>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Rent

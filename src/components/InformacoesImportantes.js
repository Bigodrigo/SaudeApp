import React, { useState, useEffect } from 'react';
import { Box, Text, Link, View, VStack, Button } from 'native-base';
export default function InformacoesImportantes() {

    return (
        <View>
            <Box width="100%" mb={1} px={4} py={2} backgroundColor="#fff" shadow="4" _text={{ color: '#DB4D37.400', fontSize: 16, fontWeight: 'bold' }}>
                Informações importantes:
            </Box>
            <Text color="#777" fontSize={13} p={2} style={{textAlign: 'justify'}}>
                A inclusão de dependentes legais é feita sem qualquer acréscimo na
                contribuição mensal do segurado principal. Para algumas classes de
                dependentes, a habilitação é simples, não necessita de abertura de
                processo. É o caso de cônjuges (civilmente casados); filhos(as) menores
                de 18 anos; filhos(as) estudantes de 18 a 24 anos ; ex cônjuge e
                ex-convivente com pensão alimentícia em nome próprio (e não aqueles que
                recebem em nome de filhos).{" "}
                <Link href="https://www.google.com" isExternal _text={{
                    color: "#DB4D37.400"
                }} mt={-0.5} _web={{
                    mb: -2
                }}>
                    Para mais informações clique aqui.
                </Link>
            </Text>
        </View>
    )

}

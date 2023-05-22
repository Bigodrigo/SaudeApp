import { Button, Modal, FormControl, Input, Center, NativeBaseProvider, Link, ScrollView, Text } from "native-base";
import { useState } from "react";

const TermosdeUso = () => {
  const [showModal, setShowModal] = useState(false);
  return (
  <Center>
    <Link onPress={() => setShowModal(true)} py={2} isUnderlined={false} 
    _text={{ color: "#DB4D37", fontWeight: 'medium' }}>Termos de Uso</Link>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width="80%" maxHeight="60%">
        <Modal.CloseButton />
        <Modal.Header>Termos de Uso</Modal.Header>
        <Modal.Body>
          <ScrollView>
              <Text textAlign={"justify"}>    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tempus sem, eu tempor 
                nunc viverra at. Donec aliquet ante et massa pellentesque aliquet. Nullam in 
                diam felis. Suspendisse elementum turpis augue, in condimentum leo imperdiet eget. 
                Nunc in elementum arcu. Praesent ultrices aliquam tortor, quis mattis lectus sagittis eget. 
                Donec efficitur odio consequat condimentum tempus. Aenean blandit, dui id iaculis tincidunt, 
                erat eros fermentum enim, et viverra enim justo vel erat.
              </Text>
              <Text mt={3} textAlign={"justify"}>     Ut orci sapien, consectetur vel maximus ac, aliquam a nunc. Nam nisl nisi, bibendum vel 
                pharetra a, ultricies id justo. Nullam nisl risus, consectetur vitae aliquam at, convallis 
                ac ipsum. Phasellus pharetra gravida molestie. Integer aliquam leo a nulla feugiat, at finibus 
                tortor hendrerit. Proin vulputate, nibh vel eleifend hendrerit, mauris erat molestie dui, 
                ornare dignissim dolor massa non velit. Mauris dictum, libero in tempor ullamcorper, risus 
                turpis auctor orci, eget iaculis magna urna vel mauris. In id dui ac nulla lobortis ullamcorper.
              </Text>
              
          </ScrollView>              
        </Modal.Body>
        <Modal.Footer/>
      </Modal.Content>
    </Modal>
  </Center>
)};

    export default () => {
        return (
          <TermosdeUso/>
        );
    };
    


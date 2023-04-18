def on_received_number(receivedNumber):
    global MessageRecu
    if traitementsignal == 1:
        MessageRecu += receivedNumber
        for index in range(10):
            serial.write_number(MessageRecu)
            serial.write_string("$")
            basic.pause(50)
        MessageRecu = 0
radio.on_received_number(on_received_number)

def on_data_received():
    radio.send_number(parse_float(serial.read_line()))
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

MessageRecu = 0
traitementsignal = 0
basic.show_string("R")
radio.set_transmit_power(7)
serial.redirect_to_usb()
serial.set_baud_rate(BaudRate.BAUD_RATE115200)
traitementsignal = 1

def on_forever():
    pass
basic.forever(on_forever)

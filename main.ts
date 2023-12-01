radio.onReceivedNumber(function (receivedNumber) {
    TransmUSB = "D" + receivedNumber + "F"
    if (traitementsignal == 1) {
        for (let index = 0; index < 10; index++) {
            serial.writeLine(TransmUSB)
        }
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    stockligne = serial.readLine()
    radio.sendNumber(parseFloat(stockligne))
    if (stockligne == "R") {
        traitementsignal = 1
        basic.showString("R")
    } else if (stockligne == "#") {
        traitementsignal = 0
        basic.showIcon(IconNames.No)
    } else if (stockligne == "Coucou") {
        serial.writeNumber(1)
        basic.showIcon(IconNames.Heart)
        basic.pause(2000)
        basic.showString("R")
    } else if (stockligne == "99999") {
        radio.sendNumber(parseFloat(stockligne))
        control.reset()
    }
})
input.onButtonPressed(Button.A, function () {
    traitementsignal = 1
    basic.showString("R")
})
input.onButtonPressed(Button.B, function () {
    basic.showString(TransmUSB)
    serial.writeLine(TransmUSB)
})
let stockligne = ""
let TransmUSB = ""
let traitementsignal = 0
basic.showString("1")
basic.showString("R")
radio.setTransmitPower(7)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
traitementsignal = 1

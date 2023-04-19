radio.onReceivedNumber(function (receivedNumber) {
    TransmUSB = "D" + receivedNumber + "F"
    while (traitementsignal == 1) {
        serial.writeLine(TransmUSB)
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
        basic.showIcon(IconNames.No)
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
basic.showIcon(IconNames.No)
radio.setTransmitPower(7)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
traitementsignal = 0

'use strict'

process.on('SIGINT', () => {
    self.close()
})

process.stdout.write('Press Ctrl+C to exit\n')

let handle_before_end = []

const read = (format) => new Promise((resolve, reject) => {
    if (!format) {
        throw new Error('argument format is required')
    }
    
    process.stdin.resume()
    process.stdin.once('data', (data) => {
        data = data.toString()
        
        if (!data) {
            return reject(data)
        }
        
        data = data.trim()
        
        if (format.test(data)) {
            resolve(data)
        } else {
            reject(data)
        }
    })
})

const stream = {
    write: (text) => process.stdout.write(text),
    println: (text) => process.stdout.write(text + '\n'),
    ask: (question, format = /.+/) => new Promise((resolve, reject) => {
        stream.write(question + ' ')
        read(format)
            .then(resolve)
            .catch(reject)
    }),
    before: (event, callback) => {
        switch (event) {
            case 'end':
                handle_before_end.push(callback)
                break
        }
    }
}

const self = {
    configure: (options) => new Promise((resolve) => {
        // nothing to do
        resolve()
    }),
    open: (start) => new Promise((resolve) => {
        resolve()
        start(stream)
    }),
    close: () => new Promise((resolve) => {
        handle_before_end.forEach((handle) => {
            handle()
        })
        
        setTimeout(() => resolve(), 1000)
    })
}

module.exports = self

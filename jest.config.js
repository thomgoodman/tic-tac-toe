module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/test/**/*.test.js',
        '**/test/**/*.property.test.js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/e2e-tests/'
    ]
};

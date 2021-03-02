module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions:['ts', "js"],
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['json-summary','text','lcov'],
}
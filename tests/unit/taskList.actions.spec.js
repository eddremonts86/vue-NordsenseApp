import {getters,mutations} from "@/store";

describe("Repository interactions stored ", () => {
    let state;
    beforeEach(() => {
        state = {
            repos: []
        }
    });
    describe('getters', () => {
        it('Has Repos?', () => {
            expect(getters.hasRepos(state)).toBe(false);
            state.repos = [{}, {}];
            expect(getters.hasRepos(state)).toBe(true)
        })
        it('Number of Repos returns correct count', () => {
            expect(getters.numberOfRepos(state)).toBe(0);
            state.repos = [{}, {}];
            expect(getters.numberOfRepos(state)).toBe(2)
        })
    });
    describe('mutations', () => {
        it('adds repository correctly', () => {
            mutations.setRepos(state, [{title: 'New post'}]);
            expect(state.repos).toEqual([{title: 'New post'}])
        })
    })
});

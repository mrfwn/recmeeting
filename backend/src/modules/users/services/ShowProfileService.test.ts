import * as ShowProfileService from "@modules/users/services/ShowProfileService"

// @ponicode
describe("execute", () => {
    let inst: any

    beforeEach(() => {
        inst = new ShowProfileService.default({})
    })

    test("0", async () => {
        await inst.execute({ user_id: "bc23a9d531064583ace8f67dad60f6bb" })
    })

    test("1", async () => {
        await inst.execute({ user_id: 12345 })
    })

    test("2", async () => {
        await inst.execute({ user_id: 9876 })
    })

    test("3", async () => {
        await inst.execute({ user_id: "c466a48309794261b64a4f02cfcc3d64" })
    })

    test("4", async () => {
        await inst.execute({ user_id: "da7588892" })
    })

    test("5", async () => {
        await inst.execute({ user_id: "" })
    })
})

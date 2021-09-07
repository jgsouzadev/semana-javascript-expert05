import {
    describe,
    test,
    expect,
    jest
} from "@jest/globals"

import fs, { stat } from 'fs'
import FileHelper from "../../src/fileHelper.js"

import Routes from "./../../src/routes.js"

describe('#Routes test suite', () => {

    describe("#getFileStatus", () => {
        test("it should return file statuses in correct format", async () => {

            const statMock =  {
                    dev: 3702800852,
                    mode: 33206,
                    nlink: 1,
                    uid: 0,
                    gid: 0,
                    rdev: 0,
                    blksize: 4096,
                    ino: 1407374884920502,
                    size: 1195211,
                    blocks: 2336,
                    atimeMs: 1630976754447.0637,
                    mtimeMs: 1630969236223.9575,
                    ctimeMs: 1630969236223.9575,
                    birthtimeMs: 1630976754195.4438,
                    atime: '2021-09-07T01:05:54.447Z',
                    mtime: '2021-09-06T23:00:36.224Z',
                    ctime: '2021-09-06T23:00:36.224Z',
                    birthtime: '2021-09-07T01:05:54.195Z'
                }
        
            const mockUser = 'joaogui'
            process.env.USER = mockUser
            const filename = "demo.gif"

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)


            const result = await FileHelper.getFileStatus("/tmp")

            const expectedResult = [
                {
                    size: '1.2 MB',
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]
            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})
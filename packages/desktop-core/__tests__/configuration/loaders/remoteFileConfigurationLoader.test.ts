import { RemoteFileConfigurationLoader } from "../../../src/configuration/loaders/remoteFileConfigurationLoader";
import { IConfigurationParser } from "../../../src/configuration/parsers/iConfigurationParser";

// tslint:disable:variable-name
describe("canLoad", () => {

    describe("can load from", () => {

        test("http", () => {

            const parser = new (jest.fn<IConfigurationParser<{}>, string[]>())();

            const loader = new RemoteFileConfigurationLoader(parser, "yaml");

            expect(loader.canLoad("http://localhost/file.yaml"))
                .toBe(true);
        });

        test("https", () => {

            const parser = new (jest.fn<IConfigurationParser<{}>, string[]>())();

            const loader = new RemoteFileConfigurationLoader(parser, "yaml");

            expect(loader.canLoad("https://localhost/file.yaml"))
                .toBe(true);
        });
    });

    describe("can't load from", () => {

        test("a local file", () => {

            const parser = new (jest.fn<IConfigurationParser<{}>, string[]>())();

            const loader = new RemoteFileConfigurationLoader(parser, "yaml");

            expect(loader.canLoad("file:///c:/file.yaml"))
                .toBe(false);
        });
        test("a network file", () => {

            const parser = new (jest.fn<IConfigurationParser<{}>, string[]>())();

            const loader = new RemoteFileConfigurationLoader(parser, "yaml");

            expect(loader.canLoad("\\\\machine\\file.yaml"))
                .toBe(false);
        });
    });
});

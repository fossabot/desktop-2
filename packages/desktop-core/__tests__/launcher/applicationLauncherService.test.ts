import { ConfigurationKind } from "../../src/configuration/configurationKind";
import { IConfiguration } from "../../src/configuration/iConfiguration";
import { ServiceHost } from "../../src/configuration/serviceHost";
import { ApplicationLauncherService } from "../../src/launcher/applicationLauncherService";
import { ILogger } from "../../src/logging";
import { IWindowFactory } from "../../src/windowing/iWindowFactory";

describe("canLaunch", () => {

    describe("can launcher", () => {

        test("when kind is application", () => {

            const windowFactory = new (jest.fn<IWindowFactory, string[]>())();

            const logger = new (jest.fn<ILogger, string[]>())();

            const launcher = new ApplicationLauncherService(logger, windowFactory);

            const configuration: IConfiguration = {
                kind: ConfigurationKind.Application,
                metadata: {
                    name: "name",
                },
                spec: {
                    url: "app-url",
                },
            };

            expect(launcher.canLaunch(configuration))
                .toBe(true);
        });
    });

    describe("can't launch", () => {

        test("when kind is service", () => {
            const windowFactory = new (jest.fn<IWindowFactory, string[]>())();

            const logger = new (jest.fn<ILogger, string[]>())();

            const launcher = new ApplicationLauncherService(logger, windowFactory);

            const configuration: IConfiguration = {
                kind: ConfigurationKind.Service,
                metadata: {
                    name: "name",
                },
                spec: {
                    host: ServiceHost.Electron,
                    main: "service.asar",
                },
            };

            expect(launcher.canLaunch(configuration))
                .toBe(false);
        });
    });
});

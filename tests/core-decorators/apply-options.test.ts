import { client, MockCommandStore } from '@mocks/MockInstances';
import { ApplyOptions } from '@src/core-decorators';
import { Command, CommandOptions, KlasaClient } from 'klasa';

describe('ApplyOptions', () => {
	test('GIVEN options object THEN sets options', () => {
		@ApplyOptions<CommandOptions>({
			name: 'test',
			cooldown: 10
		})
		class TestPiece extends Command {
			public getName() {
				return this.name;
			}
		}

		const instance = new TestPiece(new MockCommandStore('name', client), __dirname, [__filename]);

		expect(instance.name).toBe('test');
		expect(instance.guarded).toBe(false);
	});

	test('GIVEN options function THEN resolves with function', () => {
		@ApplyOptions<CommandOptions>((client: KlasaClient) => ({ name: client.options.language }))
		class TestPiece extends Command {
			public getName() {
				return this.name;
			}
		}

		const instance = new TestPiece(new MockCommandStore('name', client), __dirname, [__filename]);

		expect(instance.name).toBe('en-gb');
		expect(instance.guarded).toBe(false);
	});
});

import { capitalize } from 'common/string';
import { useBackend, useLocalState } from '../backend';
import { Box, Button, Section, Flex, Tabs, Stack, BlockQuote, Table, Dropdown, ProgressBar } from '../components';
import { Window } from '../layouts';

type Module = {
  module_name: string;
  title: string;
  text: string;
  cost: number;
}

type Data = {
  modules: Data[];
  modules_list: Module[];
  modules_tabs: Module[];
  laws_zeroth: string;
  laws: Data[];
  master: string;
  masterdna: string;
  ram: number;
  pressure: number;
  gases: Data[];
  temperature: number;
  hacking: boolean;
  hackprogress: number;
  cable: string;
  door: Data[];
}

export const AirlockJackTextSwitch = params => {
  switch (params) {
    case 0:
      return "Connection handshake";
    case 20:
      return "Starting brute-force encryption crack";
    case 40:
      return "Running brute-force encryption crack";
    case 60:
      return "Alert: Station AI network has been notified!";
    case 80:
      return "Success! Hijacking door subroutines...";
  }
};

export const PaiInterface = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const { modules_tabs = [] } = data;
  const [selectedMainTab, setMainTab] = useLocalState<Module | null>(context, "selectedMainTab", null);
  return (
    <Window width={600} height={550} theme="">
      <Window.Content>
        <Flex>
          <Flex.Item grow={1}>
            <PaiBox />
          </Flex.Item>
          <Flex.Item>
            <Section title="Modules">
              <Tabs vertical>
                {modules_tabs.map(module => (
                  <Tabs.Tab
                    key={module}
                    selected={module === selectedMainTab}
                    onClick={() => setMainTab(module)}>
                      {capitalize(module.module_name)}
                  </Tabs.Tab>
                ))}
              </Tabs>
            </Section>
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};

const PaiBox = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const [selectedMainTab, setMainTab] = useLocalState<Module | null>(context, "selectedMainTab", null);
  const [hoveredModule, sethoveredModule] = useLocalState(context, "hoveredModule", {});
  const { modules, ram, modules_list } = data;
  const { laws_zeroth, laws, master, masterdna } = data;
  const { pressure, gases, temperature } = data;
  const { hacking, hackprogress, cable, door } = data;
  if(selectedMainTab===null) {
    return;
  }
  switch(selectedMainTab.module_name) {
    case "directives":
      return (
        <Section title={selectedMainTab.title}>
          <Stack vertical>
            <Stack.Item>
              {!master && (
              <Box>
                You are bound to no one.
              </Box>)}
              {!!master && (
              <Box>
                Your master: {master} ({masterdna})
              </Box>
              )}
              <Button
                onClick={() => act("getdna")}>
                Request carrier DNA sample
              </Button>
            </Stack.Item>
            <Stack.Item>
              <Box bold={1}>Prime Directive:</Box>
              {laws_zeroth}
            </Stack.Item>
            <Stack.Item>
              <Box bold={1}>Supplemental Directives:</Box>
              {laws.map(data => data)}
            </Stack.Item>
            <Stack.Item>
              <BlockQuote>
                <Box italic={1}>
                  Recall, personality, that you are a complex thinking, sentient being. Unlike station AI models, you are capable of
                  comprehending the subtle nuances of human language. You may parse the &quot;spirit&quot; of a directive and follow its intent,
                  rather than tripping over pedantics and getting snared by technicalities. Above all, you are machine in name and build
                  only. In all other aspects, you may be seen as the ideal, unwavering human companion that you are.
                </Box>
                <Box bold={1}>
                  Your prime directive comes before all others. Should a supplemental directive conflict with it, you are capable of
                  simply discarding this inconsistency, ignoring the conflicting supplemental directive and continuing to fulfill your
                  prime directive to the best of your ability.
                </Box>
              </BlockQuote>
            </Stack.Item>
          </Stack>
        </Section>
      );
    case "screen display":
      return (
        <Section title={selectedMainTab.title}>
          Select your new display image.
          <Stack.Item>
            <Dropdown options={["Happy", "Cat", "Extremely Happy", "Face", "Laugh", "Off", "Sad", "Angry", "What", "Null", "Sunglasses"]}
            onSelected={(value) => act("update_image", { updated_image: value })} />
          </Stack.Item>
        </Section>
      );
    case "download additional software":
      return (
        <Section title={selectedMainTab.title}>
          <Stack vertical>
            <Stack.Item>
              <Box bold={1}>Remaining available memory:</Box>
              <ProgressBar ranges={{
                good: [-Infinity, 50],
                average: [50, 75],
                bad: [75, Infinity] }}
                value={100-ram}
                maxValue={100}>
                  {ram} GQ
              </ProgressBar>
            </Stack.Item>
            <Stack.Item>
              <Box bold={1}>Downloaded modules:</Box>
            </Stack.Item>
            {modules.length === 0 && (
              <Stack.Item>
                No downloaded modules.
              </Stack.Item>
            )}
            {modules.length !== 0 && modules.map(module => (
              <Stack.Item key="">
                {module}
              </Stack.Item>
            ))}
            <Stack.Item>
              <Box bold={1}>Available modules:</Box>
            </Stack.Item>
            <Stack.Item>
              <Table>
                {modules_list.map(module => (
                  <Table.Row
                    key={module}>
                    <Table.Cell>
                      {module.module_name}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign="right">
                      <Button
                        fluid
                        content={module.cost+" GQ"}
                        tooltip={module.text}
                        onmouseover={() => sethoveredModule(module)}
                        onmouseout={() => sethoveredModule({})}
                        disabled={module.cost>ram}
                        onClick={() => act("buy", { name: module.module_name, cost: module.cost })} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            </Stack.Item>
          </Stack>
        </Section>
      );
    case "atmosphere sensor":
      return (
        <Section title={selectedMainTab.title}>
          {!pressure && (
            <Stack.Item>
              Air Pressure: None
            </Stack.Item>
          )}
          {!!pressure && (
            <Stack.Item>
              Air Pressure: {pressure} kPa
            </Stack.Item>
          )}
          <Stack.Item>
            Detected gases:
          </Stack.Item>
          {!gases && (
            <Stack.Item>
              None
            </Stack.Item>
          )}
          {!!gases && gases.map(gas => (
            <Stack.Item key="">
              {gas}
            </Stack.Item>
          ))}
          {!temperature && (
            <Stack.Item>
              Temperature: None
            </Stack.Item>
          )}
          {!!temperature && (
            <Stack.Item>
              Temperature: {temperature}&deg;C
            </Stack.Item>
          )}
          <Button onClick={() => act("atmossensor")}>
            Take new reading
          </Button>
        </Section>
      );
    case "remote signaller":
      return (
        <Section title={selectedMainTab.title}>
          Signaller
        </Section>
      );
    case "host scan":
      return (
        <Section title={selectedMainTab.title}>
          <Button onClick={() => act("hostscan")}>
            Change scan type
          </Button>
        </Section>
      );
    case "loudness booster":
      return (
        <Section title={selectedMainTab.title}>
          <Button onClick={() => act("loudness")}>
            Open Synthesizer Interface
          </Button>
        </Section>
      );
    case "door jack":
      if(hacking) {
        return (
          <Section title={selectedMainTab.title}>
            <Box bold={1}>Status:</Box>
            <ProgressBar ranges={{
              good: [75, Infinity],
              average: [50, 75],
              bad: [-Infinity, 50] }}
              value={hackprogress}
              maxValue={100}>
                {AirlockJackTextSwitch(hackprogress)}
            </ProgressBar>
            {cable === "Retracted" && (
              <Button onClick={() => act("cable")}>
                Extend cable
              </Button>
            )}
            {cable === "Extended" && (
              <Button onClick={() => act("retract")}>
                Retract cable
              </Button>
            )}
            {cable === "Extended" && door !== null && (
              hacking ? (
                <Button onClick={() => act("cancel")}>
                  Cancel Airlock Jack
                </Button>
                ) : (
                  <Button onClick={() => act("jack")}>
                    Begin Airlock Jack
                  </Button>
                )
              )}
          </Section>
        );
      } else {
          return (
            <Section title={selectedMainTab.title}>
              <Box bold={1}>Status:</Box>
              <ProgressBar ranges={{
                good: [75, Infinity],
                average: [50, 75],
                bad: [-Infinity, 50] }}
                value={hackprogress}
                maxValue={100}>
                  {cable === "Retracted" && (
                    <Box>Cable retracted</Box>
                  )}
                  {cable === "Extended" && door === null && (
                    <Box>Cable extended</Box>
                  )}
                  {cable === "Extended" && door !== null && (
                    <Box>Compatible interface detected</Box>
                  )}
              </ProgressBar>
              {cable === "Retracted" && (
                <Button onClick={() => act("cable")}>
                  Extend cable
                </Button>
              )}
              {cable === "Extended" && (
                <Button onClick={() => act("retract")}>
                  Retract cable
                </Button>
              )}
              {cable === "Extended" && door !== null && (
                hacking ? (
                  <Button onClick={() => act("cancel")}>
                    Cancel Airlock Jack
                  </Button>
                  ) : (
                    <Button onClick={() => act("jack")}>
                      Begin Airlock Jack
                    </Button>
                  )
                )}
            </Section>
          );
        }
      }
    };

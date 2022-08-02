import { OmnichannelChatSDK } from "@microsoft/omnichannel-chat-sdk";
import { LiveChatWidget } from "@microsoft/omnichannel-chat-widget";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const getOmnichannelChatConfig = () => {
  // add your own OC setting, hard-coded just for sample, should be replaced with a better handling
  const omnichannelConfig = {
    orgId: "",
    orgUrl: "",
    widgetId: "",
  };
  return omnichannelConfig;
};

function Widget() {
  const [liveChatWidgetProps, setLiveChatWidgetProps] = useState<any>();

  const chatSDKConfig = {
    chatReconnect: {
      disable: false,
    },
    persistentChat: {
      disable: false,
      tokenUpdateTime: 21600000,
    },
  };

  useEffect(() => {
    const init = async () => {
      const omnichannelConfig = getOmnichannelChatConfig();

      const chatSDK = new OmnichannelChatSDK(omnichannelConfig, chatSDKConfig);
      chatSDK.setDebug(true);

      await chatSDK.initialize();
      const chatConfig = await chatSDK.getLiveChatConfig();

      const liveChatWidgetProps = {
        styleProps: {
          generalStyles: {
            width: "400px",
            height: "600px",
            bottom: "30px",
            right: "30px",
          },
        },
        chatSDK,
        chatConfig,
        webChatContainerProps: {
          disableMarkdownMessageFormatting: true, //setting the default to true for a known issue with markdown
        },
        telemetryConfig: {
          telemetryDisabled: true,
          disableConsoleLog: false,
        },
      };

      setLiveChatWidgetProps(liveChatWidgetProps);
    };

    init();
  }, []);

  return (
    <div>
      {liveChatWidgetProps && <LiveChatWidget {...liveChatWidgetProps} />}
    </div>
  );
}

ReactDOM.render(
  <div>
    <h1>Async Chat Widget TS</h1>
    <Widget />
  </div>,
  document.getElementById("root")
);

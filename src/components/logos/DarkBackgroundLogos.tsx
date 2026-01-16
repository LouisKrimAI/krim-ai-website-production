/**
 * DARK BACKGROUND LOGOS
 * Actual logo images from the provided PDF
 * Optimized for dark backgrounds
 */
import React from 'react';

// Import actual logo images
import razorpayImg from '../../assets/logos/razorpay.png';
import stripeImg from '../../assets/logos/stripe.png';
import databricksImg from '../../assets/logos/databricks.png';
import zoomImg from '../../assets/logos/zoom.png';
import nvidiaImg from '../../assets/logos/nvidia.png';
import livekitImg from '../../assets/logos/livekit.png';
import slackImg from '../../assets/logos/slack.png';
import signzyImg from '../../assets/logos/signzy.png';
import jackhenryImg from '../../assets/logos/jackhenry.png';
import temenosImg from '../../assets/logos/temenos.png';
import microsoftImg from '../../assets/logos/microsoft.png';
import awsImg from '../../assets/logos/aws.png';
import snowflakeImg from '../../assets/logos/snowflake.png';
import azureImg from '../../assets/logos/azure.png';
import fiserveImg from '../../assets/logos/fiserve.png';
import hubspotImg from '../../assets/logos/hubspot.png';
import salesforceImg from '../../assets/logos/Salesforce.png';
import oracleImg from '../../assets/logos/oracle.png';
import discordImg from '../../assets/logos/Discord.png';
import teamsImg from '../../assets/logos/teams.png';
import fisImg from '../../assets/logos/FIS.png';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

// Logo components using actual images
export const RazorpayLogo: React.FC<LogoProps> = ({ className = "", width = 140, height = 40 }) => (
  <img 
    src={razorpayImg} 
    alt="Razorpay" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const StripeLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={stripeImg} 
    alt="Stripe" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const DatabricksLogo: React.FC<LogoProps> = ({ className = "", width = 120, height = 40 }) => (
  <img 
    src={databricksImg} 
    alt="Databricks" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const ZoomLogo: React.FC<LogoProps> = ({ className = "", width = 70, height = 40 }) => (
  <img 
    src={zoomImg} 
    alt="Zoom" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const NVIDIALogo: React.FC<LogoProps> = ({ className = "", width = 100, height = 40 }) => (
  <img 
    src={nvidiaImg} 
    alt="NVIDIA" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const LiveKitLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={livekitImg} 
    alt="LiveKit" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const SlackLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={slackImg} 
    alt="Slack" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const SignzyLogo: React.FC<LogoProps> = ({ className = "", width = 100, height = 40 }) => (
  <img 
    src={signzyImg} 
    alt="Signzy" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const JackHenryLogo: React.FC<LogoProps> = ({ className = "", width = 110, height = 40 }) => (
  <img 
    src={jackhenryImg} 
    alt="Jack Henry" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const TemenosLogo: React.FC<LogoProps> = ({ className = "", width = 90, height = 40 }) => (
  <img 
    src={temenosImg} 
    alt="Temenos" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const MicrosoftLogo: React.FC<LogoProps> = ({ className = "", width = 110, height = 40 }) => (
  <img 
    src={microsoftImg} 
    alt="Microsoft" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const AWSLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={awsImg} 
    alt="AWS" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const SnowflakeLogo: React.FC<LogoProps> = ({ className = "", width = 120, height = 40 }) => (
  <img 
    src={snowflakeImg} 
    alt="Snowflake" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const AzureLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={azureImg} 
    alt="Azure" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const FiservLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={fiserveImg} 
    alt="Fiserv" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const HubSpotLogo: React.FC<LogoProps> = ({ className = "", width = 100, height = 40 }) => (
  <img 
    src={hubspotImg} 
    alt="HubSpot" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const SalesforceLogo: React.FC<LogoProps> = ({ className = "", width = 120, height = 40 }) => (
  <img 
    src={salesforceImg} 
    alt="Salesforce" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const OracleLogo: React.FC<LogoProps> = ({ className = "", width = 80, height = 40 }) => (
  <img 
    src={oracleImg} 
    alt="Oracle" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const DiscordLogo: React.FC<LogoProps> = ({ className = "", width = 75, height = 40 }) => (
  <img 
    src={discordImg} 
    alt="Discord" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const TeamsLogo: React.FC<LogoProps> = ({ className = "", width = 75, height = 40 }) => (
  <img 
    src={teamsImg} 
    alt="Microsoft Teams" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const FISLogo: React.FC<LogoProps> = ({ className = "", width = 60, height = 40 }) => (
  <img 
    src={fisImg} 
    alt="FIS" 
    width={width} 
    height={height} 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

// Logo mapping object with all actual images
export const darkBackgroundLogos = {
  'Razorpay': RazorpayLogo,
  'Stripe': StripeLogo,
  'Databricks': DatabricksLogo,
  'Zoom': ZoomLogo,
  'NVIDIA': NVIDIALogo,
  'LiveKit': LiveKitLogo,
  'Slack': SlackLogo,
  'Signzy': SignzyLogo,
  'Jack Henry': JackHenryLogo,
  'Temenos': TemenosLogo,
  'Microsoft': MicrosoftLogo,
  'AWS': AWSLogo,
  'Snowflake': SnowflakeLogo,
  'Azure': AzureLogo,
  'Fiserv': FiservLogo,
  'HubSpot': HubSpotLogo,
  'Salesforce': SalesforceLogo,
  'Oracle': OracleLogo,
  'Discord': DiscordLogo,
  'Teams': TeamsLogo,
  'FIS': FISLogo
};
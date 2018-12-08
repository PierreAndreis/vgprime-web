import React from "react";

import { Query } from "react-apollo";
import Link from "next/link";
import { css } from "emotion";

import { PlayerStats } from "../../api/types";
import { playerHeroes } from "../../graphql/player";

const heroImage = (heroName: string): string =>
  `https://vgproassets.nyc3.cdn.digitaloceanspaces.com/heroes/${heroName.toLowerCase()}.png`;

const heroeImageSize = "40px";

const heroAvatar = css`
  background-color: #dcdcdc;
  background-size: ${heroeImageSize} ${heroeImageSize};
  width: ${heroeImageSize};
  height: ${heroeImageSize};
  border-radius: ${heroeImageSize};
  margin-right: 5px;
`;

type Props = {
  playerName: string;
};

const TopHeroes: React.FunctionComponent<Props> = props => {
  return (
    <Query query={playerHeroes} variables={{ playerName: props.playerName }}>
      {({ data, loading }) => {
        let heroes: ReadonlyArray<string> = [];

        if (
          !loading &&
          data &&
          data.playerStats &&
          data.playerStats.stats &&
          data.playerStats.stats.Heroes
        ) {
          const player = data.playerStats as PlayerStats;

          heroes = [...player.stats.Heroes]
            .sort((a, b) => (a.games !== b.games ? (a.games > b.games ? -1 : 1) : 0))
            .map(hero => hero.name);
        }

        const res: React.ReactNode[] = [];

        for (let i = 0; i < 5; i++) {
          let style;
          let heroLink = "";
          if (heroes[i]) {
            heroLink = `https://vgpro.gg/heroes/${heroes[i]}`;
            style = {
              backgroundImage: `url(${heroImage(heroes[i])}`,
            };
          }

          res.push(
            <Link href={heroLink} key={`${props.playerName}-${i}`}>
              <a target="_blank">
                <div className={heroAvatar} style={style} />
              </a>
            </Link>
          );
        }
        return res;
      }}
    </Query>
  );
};

export default TopHeroes;
